package com.pos.model.persist;

import java.util.Set;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "order_detail")
public class OrderDetail {

    @Id
    @SequenceGenerator(name = "order_detail_id_seq", sequenceName = "order_detail_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_detail_id_seq")
    @Column(name = "id", updatable = false)
    private long id;

    private long itemId;
    private int quantity;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "dollar", column = @Column(name = "newdollar")),
            @AttributeOverride(name = "cent", column = @Column(name = "newcent")) })
    private Price newPrice;
    private boolean active;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "order_detail_addon_items_map", joinColumns = @JoinColumn(name = "orderdetail_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "orderdetailaddonitem_id", referencedColumnName = "id"))
    Set<OrderDetailAddonItem> orderDetailAddonItems;

    public Set<OrderDetailAddonItem> getOrderDetailAddonItems() {
        return orderDetailAddonItems;
    }

    public void setOrderDetailAddonItems(
            Set<OrderDetailAddonItem> orderDetailAddonItems) {
        this.orderDetailAddonItems = orderDetailAddonItems;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getItemId() {
        return itemId;
    }

    public void setItemId(long itemId) {
        this.itemId = itemId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Price getNewPrice() {
        return newPrice;
    }

    public void setNewPrice(Price newPrice) {
        this.newPrice = newPrice;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

}