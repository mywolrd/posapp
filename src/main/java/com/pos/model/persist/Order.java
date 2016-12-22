package com.pos.model.persist;

import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "`order`")
public class Order {

    @Id
    @SequenceGenerator(name = "order_id_seq", sequenceName = "order_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_id_seq")
    @Column(name = "id", updatable = false)
    private long id;
    private long customerId;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "order_details_map", joinColumns = @JoinColumn(name = "order_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "orderdetail_id", referencedColumnName = "id"))
    private Set<OrderDetail> details;

    private LocalDateTime dropDate;
    private LocalDateTime readyDate;
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

    public long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(long customerId) {
        this.customerId = customerId;
    }

    public Set<OrderDetail> getDetails() {
        return details;
    }

    public void setDetails(Set<OrderDetail> details) {
        this.details = details;
    }

    public boolean isCompleted() {
        return completed;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
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