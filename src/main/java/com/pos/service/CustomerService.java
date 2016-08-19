package com.pos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pos.dao.CustomerDao;
import com.pos.model.application.Customer;
import com.pos.model.parameter.CustomerParameter;

@Service
public class CustomerService {

    @Autowired
    private CustomerDao customerDao;

    @Transactional(readOnly = false)
    public long save(CustomerParameter customer) {
        return customerDao.save(customer);
    }

    @Transactional(readOnly = false)
    public long update(CustomerParameter customer) {
        return customerDao.update(customer);
    }

    @Transactional(readOnly = true)
    public List<Customer> searchByLikeLastName(String querystr) {
        return customerDao.searchByLikeLastName(querystr);
    }

    @Transactional(readOnly = true)
    public Customer uniqueById(long id) {
        return this.customerDao.uniqueById(id);
    }
}