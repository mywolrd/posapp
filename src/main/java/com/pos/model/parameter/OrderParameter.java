package com.pos.model.parameter;

public class OrderParameter {
    private long id;
    private OrderDetailParameter[] orderDetails;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public OrderDetailParameter[] getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(OrderDetailParameter[] orderDetails) {
        this.orderDetails = orderDetails;
    }
}