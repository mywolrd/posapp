package com.pos.dao;

import java.util.List;

import com.pos.model.persist.Customer;

public interface CustomerDao extends HibernateDao<Customer, Long> {
    List<Customer> searchByLikeLastName(String querystr);
}