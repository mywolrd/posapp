package com.pos.dao;

import java.util.List;

import com.pos.model.application.OrderDetails;

public interface OrderDetailsDao {

    OrderDetails uniqueById(long id);

    List<OrderDetails> listByOrderId(long orderId);

    void save(OrderDetails details);

    void update(OrderDetails details);

    // is it required?
    void delete(OrderDetails details);
}