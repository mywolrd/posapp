package com.pos.dao;

import java.io.Serializable;

public interface HibernateWeightedDao<T, ID extends Serializable>
        extends HibernateDao<T, ID> {
    int getMaxWeight();
}