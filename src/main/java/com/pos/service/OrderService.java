package com.pos.service;

import org.springframework.stereotype.Service;

import com.pos.model.application.Customer;

@Service
public class OrderService {

    public void uniqueById(long id) {

    }

    public void update() {

    }

    public void save() {

    }

    public void listByCustomer(Customer customer) {
        this.listByCustomerId(customer.getId());
    }

    public void listByCustomerId(long customerId) {

    }
}