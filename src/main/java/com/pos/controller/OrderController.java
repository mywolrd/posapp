package com.pos.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.pos.model.parameter.OrderParameter;
import com.pos.model.persist.Order;
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

    /*
     * @RequestMapping(value = "/customer/{customerId}", method =
     * RequestMethod.GET) public void listByCustomerId(@PathVariable long
     * customerId) { this.orderService.listByCustomerId(customerId); }
     * 
     * @RequestMapping(value = "/{id}", method = RequestMethod.GET) public void
     * uniqueById(@PathVariable long id) { this.orderService.uniqueById(id); }
     */
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
    /*
     * @RequestMapping(value = "/update", method = RequestMethod.POST) public
     * void updateOrder() { this.orderService.update(); }
     */
}
