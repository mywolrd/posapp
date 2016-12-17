package com.pos.utils;

import org.springframework.stereotype.Component;

import com.pos.model.parameter.CustomerParameter;
import com.pos.model.persist.Customer;

@Component
public class CustomerUtils {

    public Customer to_Customer(CustomerParameter param) {
        Customer _customer = new Customer();
        _customer.setId(param.getId());
        _customer.setLastName(param.getLastName());
        _customer.setFirstName(param.getFirstName());
        _customer.setNumber(param.getPhoneNumber());
        return _customer;
    }

    public Customer new_customer(Customer customer) {
        Customer _customer = new Customer();
        _customer.setId(0);
        _customer.setLastName(customer.getLastName());
        _customer.setFirstName(customer.getFirstName());
        _customer.setNumber(customer.getNumber());
        return _customer;
    }

}