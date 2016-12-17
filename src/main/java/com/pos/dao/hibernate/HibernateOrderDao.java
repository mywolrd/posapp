package com.pos.dao.hibernate;

import org.springframework.stereotype.Repository;

import com.pos.dao.OrderDao;
import com.pos.model.persist.Order;

@Repository
public class HibernateOrderDao extends HibernateBaseDao<Order, Long>
        implements OrderDao {

}