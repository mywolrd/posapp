package com.pos.controller;

import java.util.LinkedList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.google.common.primitives.Longs;
import com.pos.model.parameter.OrderIdParameter;
import com.pos.model.parameter.OrderParameter;
import com.pos.model.persist.Order;
import com.pos.model.web.W_Order;
import com.pos.service.OrderService;
import com.pos.utils.OrderUtils;

@Controller
@RequestMapping("/order")
public class OrderController {

    private static final Logger logger = LogManager
            .getLogger(OrderController.class);

    @Autowired
    private OrderUtils orderUtils;

    @Autowired
    private OrderService orderService;

    @RequestMapping(value = "/customer/{customerId}", method = RequestMethod.GET)
    @Transactional
    public ResponseEntity<List<W_Order>> listByCustomerId(
            @PathVariable long customerId) {
        List<Order> orders = this.orderService.listByCustomerId(customerId);
        List<W_Order> _orders = new LinkedList<>();
        for (Order order : orders) {
            _orders.add(orderUtils.to_W_Order(order));
        }
        return new ResponseEntity<>(_orders, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @Transactional
    public ResponseEntity<W_Order> uniqueById(@PathVariable long id) {
        Order order = this.orderService.uniqueForId(id);
        W_Order _order = orderUtils.to_W_Order(order);
        return new ResponseEntity<>(_order, HttpStatus.OK);
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    public ResponseEntity<Order> saveNewOrder(
            @RequestBody OrderParameter param) {
        if (param.getCustomerId() == 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Order order = orderUtils.to_Order(param);

        this.orderService.saveOrUpdateOrder(order);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/complete", method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<List<Order>> completeOrders(
            @RequestBody OrderIdParameter param) {
        List<Order> orders = this.orderService
                .completeOrders(Longs.asList(param.getOrderId()));
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @RequestMapping(value = "/void", method = RequestMethod.POST)
    @Transactional
    public ResponseEntity<List<Order>> voidOrders(
            @RequestBody OrderIdParameter param) {
        List<Order> orders = this.orderService
                .voidOrders(Longs.asList(param.getOrderId()));
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public ResponseEntity<String> updateOrder() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
