package com.pos.dao;

import java.util.List;

import com.pos.model.application.Customer;
import com.pos.model.parameter.CustomerParameter;
import com.pos.model.parameter.SearchParameter;

public interface CustomerDao {

    Customer uniqueById(long id);

    long save(CustomerParameter customer);

    long update(CustomerParameter customer);

    List<Customer> search(SearchParameter parameter);
}