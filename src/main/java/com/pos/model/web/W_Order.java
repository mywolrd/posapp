package com.pos.model.web;

import java.time.LocalDateTime;
import java.util.List;

import com.pos.model.persist.Customer;

public class W_Order {

    private long id;
    private Customer customer;
    private boolean completed;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
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

    public List<W_OrderDetail> getDetails() {
        return details;
    }

    public void setDetails(List<W_OrderDetail> details) {
        this.details = details;
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

    private boolean voided;
    private List<W_OrderDetail> details;
    private LocalDateTime dropDate;
    private LocalDateTime readyDate;
    private LocalDateTime pickupDate;
}