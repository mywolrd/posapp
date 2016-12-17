package com.pos.model.persist;

import javax.persistence.Embeddable;

@Embeddable
public class Price {
    private int dollar;
    private int cent;

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