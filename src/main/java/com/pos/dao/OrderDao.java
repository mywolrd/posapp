package com.pos.dao;

import java.util.List;

import com.pos.model.persist.Order;

public interface OrderDao extends HibernateDao<Order, Long> {

    List<Order> listOrdersByCustomerId(long customerId);
}