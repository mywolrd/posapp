package com.pos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pos.dao.CustomerDao;
import com.pos.model.persist.Customer;

@Service
public class CustomerService {

    @Autowired
    private CustomerDao customerDao;

    @Transactional(readOnly = false)
    public Customer save(Customer customer) {
        return this.customerDao.save(customer);
    }

    @Transactional(readOnly = false)
    public Customer update(Customer customer) {
        return customerDao.update(customer);
    }

    @Transactional(readOnly = true)
    public List<Customer> searchByLikeLastName(String querystr) {
        return customerDao.searchByLikeLastName(querystr);
    }

    @Transactional(readOnly = true)
    public Customer uniqueForId(long id) {
        return this.customerDao.uniqueForId(id);
    }
}