package com.pos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.pos.model.parameter.OrderParameter;
import com.pos.service.OrderService;

@Controller
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @RequestMapping(value = "/customer/{customerId}", method = RequestMethod.GET)
    public void listByCustomerId(@PathVariable long customerId) {
        this.orderService.listByCustomerId(customerId);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public void uniqueById(@PathVariable long id) {
        this.orderService.uniqueById(id);
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public void saveNewOrder(@RequestBody OrderParameter order) {
        this.orderService.saveOrUpdateOrder();
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public void updateOrder() {
        this.orderService.update();
    }
}
