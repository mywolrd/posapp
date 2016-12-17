package com.pos.dao.hibernate;

import org.springframework.stereotype.Repository;

import com.pos.dao.OrderDetailDao;
import com.pos.model.persist.OrderDetail;

@Repository
public class HibernateOrderDetailDao extends HibernateBaseDao<OrderDetail, Long>
        implements OrderDetailDao {

}