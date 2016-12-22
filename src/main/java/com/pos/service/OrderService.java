package com.pos.service;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pos.dao.OrderDao;
import com.pos.model.persist.Customer;
import com.pos.model.persist.Order;

@Service
public class OrderService {

    @Autowired
    private OrderDao orderDao;

    @Transactional
    public Order uniqueForId(long id) {
        return orderDao.uniqueForId(id);
    }

    @Transactional
    public List<Order> listByIds(List<Long> idList) {
        if (idList.isEmpty())
            return new LinkedList<>();
        return this.orderDao.listByIds(idList);
    }

    @Transactional
    public List<Order> completeOrders(List<Long> idList) {
        List<Order> orders = this.listByIds(idList);

        if (orders.isEmpty())
            return new LinkedList<>();

        for (Order order : orders) {
            order.setCompleted(true);
            order.setPickupDate(LocalDateTime.now());
            saveOrUpdateOrder(order);
        }
        return listByCustomerId(orders.get(0).getCustomerId());
    }

    @Transactional
    public List<Order> voidOrders(List<Long> idList) {
        List<Order> orders = this.listByIds(idList);

        if (orders.isEmpty())
            return new LinkedList<>();

        for (Order order : orders) {
            order.setVoided(true);
            order.setDropDate(null);
            order.setReadyDate(null);
            order.setPickupDate(null);
            saveOrUpdateOrder(order);
        }
        return listByCustomerId(orders.get(0).getCustomerId());
    }

    @Transactional
    public Order saveOrUpdateOrder(Order order) {
        return this.orderDao.saveOrUpdate(order);
    }

    public List<Order> listByCustomer(Customer customer) {
        return this.listByCustomerId(customer.getId());
    }

    @Transactional
    public List<Order> listByCustomerId(long customerId) {
        return orderDao.listOrdersByCustomerId(customerId);
    }
}