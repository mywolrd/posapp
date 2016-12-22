package com.pos.dao.hibernate;

import java.util.List;

import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.pos.dao.OrderDao;
import com.pos.model.persist.Order;

@Repository
public class HibernateOrderDao extends HibernateBaseDao<Order, Long>
        implements OrderDao {

    @Override
    public List<Order> listOrdersByCustomerId(long customerId) {
        return this.findByCriteria(
                Restrictions.eq(DBNames.CUSTOMERID, customerId));
    }

}