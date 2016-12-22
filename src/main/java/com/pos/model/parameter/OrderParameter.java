package com.pos.model.parameter;

import java.time.LocalDateTime;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;

public class OrderParameter {
    private long id;
    private long customerId;
    private OrderDetailParameter[] orderDetails;

    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime dropDate;
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime readyDate;
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime pickupDate;

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

    public OrderDetailParameter[] getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(OrderDetailParameter[] orderDetails) {
        this.orderDetails = orderDetails;
    }

    public LocalDateTime getDropDate() {
        return dropDate;
    }

    public void setDropDate(LocalDateTime dropDate) {
        this.dropDate = dropDate;
    }

    public LocalDateTime getReadyDate() {
        return readyDate;
    }

    public void setReadyDate(LocalDateTime readyDate) {
        this.readyDate = readyDate;
    }

    public LocalDateTime getPickupDate() {
        return pickupDate;
    }

    public void setPickupDate(LocalDateTime pickupDate) {
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

    public long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(long customerId) {
        this.customerId = customerId;
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