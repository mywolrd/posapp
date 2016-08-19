package com.pos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.pos.model.application.Customer;
import com.pos.model.parameter.CustomerParameter;
import com.pos.service.CustomerService;
import com.pos.utils.Utils;

@Controller
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<Customer> save(@RequestBody CustomerParameter customer) {
        if (!this.isValidCustomerParameter(customer)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        long createdId = this.customerService.save(customer);
        Customer created = this.customerService.uniqueById(createdId);
        return new ResponseEntity<>(created, HttpStatus.ACCEPTED);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseEntity<Customer> update(@RequestBody CustomerParameter customer) {

        if (!this.isValidCustomerParameter(customer)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (Utils.ZERO == customer.getId()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        long updatedId = this.customerService.update(customer);
        Customer updated = this.customerService.uniqueById(updatedId);
        return new ResponseEntity<>(updated, HttpStatus.ACCEPTED);
    }

    @RequestMapping(value = "/search/{lastNameLike}", method = RequestMethod.GET)
    public ResponseEntity<List<Customer>> search(@PathVariable String lastNameLike) {
        List<Customer> customers = this.customerService.searchByLikeLastName(lastNameLike.toUpperCase());
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    private boolean isValidCustomerParameter(CustomerParameter customer) {

        if (null == customer.getLastName())
            return false;

        if (customer.getLastName().isEmpty())
            return false;

        return true;
    }
}