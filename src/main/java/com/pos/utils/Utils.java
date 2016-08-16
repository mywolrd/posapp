package com.pos.utils;

public class Utils {

    public static final int ZERO = 0;

    public static String lpad(String s, int n) {
        return String.format("%1$" + n + "s", s);
    }

    public static String rpad(String s, int n) {
        return String.format("%1$-" + n + "s", s);
    }
}