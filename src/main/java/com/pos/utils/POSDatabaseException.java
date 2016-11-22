package com.pos.utils;

public class POSDatabaseException extends RuntimeException {

    private static final long serialVersionUID = -3895714381962611435L;

    public POSDatabaseException(String msg) {
        super(msg);
    }

    public POSDatabaseException(String msg, Throwable e) {
        super(msg, e);
    }

    public POSDatabaseException(Throwable e) {
        super(e);
    }
}