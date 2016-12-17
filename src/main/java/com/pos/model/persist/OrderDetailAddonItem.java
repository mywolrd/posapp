package com.pos.model.persist;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "order_detail_addon_item")
public class OrderDetailAddonItem {

    @Id
    @SequenceGenerator(name = "order_detail_addon_item_id_seq", sequenceName = "order_detail_addon_item_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_detail_addon_item_id_seq")
    @Column(name = "id", updatable = false)
    private long id;
    private long addonItemId;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "dollar", column = @Column(name = "newdollar")),
            @AttributeOverride(name = "cent", column = @Column(name = "newcent")) })
    private Price newPrice;
    private boolean active;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getAddonItemId() {
        return addonItemId;
    }

    public void setAddonItemId(long addonItemId) {
        this.addonItemId = addonItemId;
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