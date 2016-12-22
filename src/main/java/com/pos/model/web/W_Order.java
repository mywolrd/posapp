package com.pos.model.web;

import java.util.List;

public class W_Order {

    private long id;
    private long customerId;

    private List<W_OrderDetail> orderDetails;

    private long dropDate;
    private long readyDate;
    private long pickupDate;

    private boolean active;
    private boolean completed;
    private boolean voided;

    private int quantity;
    private int dollar;
    private int cent;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(long customerId) {
        this.customerId = customerId;
    }

    public List<W_OrderDetail> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<W_OrderDetail> orderDetails) {
        this.orderDetails = orderDetails;
    }

    public long getDropDate() {
        return dropDate;
    }

    public void setDropDate(long dropDate) {
        this.dropDate = dropDate;
    }

    public long getReadyDate() {
        return readyDate;
    }

    public void setReadyDate(long readyDate) {
        this.readyDate = readyDate;
    }

    public long getPickupDate() {
        return pickupDate;
    }

    public void setPickupDate(long pickupDate) {
        this.pickupDate = pickupDate;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public boolean isVoided() {
        return voided;
    }

    public void setVoided(boolean voided) {
        this.voided = voided;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getDollar() {
        return dollar;
    }

    public void setDollar(int dollar) {
        this.dollar = dollar;
    }

    public int getCent() {
        return cent;
    }

    public void setCent(int cent) {
        this.cent = cent;
    }
}