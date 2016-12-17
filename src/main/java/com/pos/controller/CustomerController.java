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

import com.pos.model.parameter.CustomerParameter;
import com.pos.model.persist.Customer;
import com.pos.service.CustomerService;
import com.pos.utils.CustomerUtils;
import com.pos.utils.Utils;

@Controller
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private CustomerUtils customerUtils;

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<Customer> save(@RequestBody CustomerParameter param) {
        if (!this.isValidCustomerParameter(param)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Customer customer = customerUtils.to_Customer(param);
        Customer created = this.customerService.save(customer);
        return new ResponseEntity<>(created, HttpStatus.ACCEPTED);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseEntity<Customer> update(
            @RequestBody CustomerParameter param) {

        if (!this.isValidCustomerParameter(param)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (Utils.ZERO == param.getId()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Customer customer = customerUtils.to_Customer(param);
        Customer updated = this.customerService.update(customer);
        return new ResponseEntity<>(updated, HttpStatus.ACCEPTED);
    }

    @RequestMapping(value = "/search/{lastNameLike}", method = RequestMethod.GET)
    public ResponseEntity<List<Customer>> search(
            @PathVariable String lastNameLike) {
        List<Customer> customers = this.customerService
                .searchByLikeLastName(lastNameLike.toUpperCase());
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