package com.pos.model.application;

import com.google.common.base.Objects;

public class ItemType {

    private long id;
    private String name;
    private int weight;
    private boolean active;

    public ItemType(long id, String name, int weight, boolean active) {
        /* TODO */
        /*
         * Probably need to bubble it up and log.
         * 
         */
        if (name == null)
            throw new RuntimeException("ItemType name cannot be null.");
        this.name = name;
        this.id = id;
        this.weight = weight;
        this.active = active;

    }

    public String getName() {
        return this.name;
    }

    public long getId() {
        return this.id;
    }

    public int getWeight() {
        return this.weight;
    }

    public boolean isActive() {
        return this.active;
    }

    @Override
    public String toString() {
        return name;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(this.name);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ItemType other = (ItemType) obj;
        return Objects.equal(this.name, other.name);
    }
}