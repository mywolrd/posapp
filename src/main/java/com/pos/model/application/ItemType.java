package com.pos.model.application;

import com.google.common.base.Objects;

public class ItemType {

    private String name;

    public ItemType(String name) {
        /* TODO */
        /*
         * Probably need to bubble it up and log.
         * 
         */
        if (name == null)
            throw new RuntimeException("ItemType name cannot be null.");
        this.name = name;
    }

    public String getName() {
        return name;
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