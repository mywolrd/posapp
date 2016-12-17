package com.pos.service;

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

    public void uniqueById(long id) {

    }

    public void update() {

    }

    @Transactional
    public void saveOrUpdateOrder(Order order) {
        this.orderDao.saveOrUpdate(order);
    }

    public void listByCustomer(Customer customer) {
        this.listByCustomerId(customer.getId());
    }

    public void listByCustomerId(long customerId) {

    }
}