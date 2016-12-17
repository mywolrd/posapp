package com.pos.dao.hibernate;

import java.io.Serializable;

import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.pos.dao.HibernateWeightedDao;
import com.pos.utils.POSDatabaseException;

@Repository
public abstract class HibernateWeightedBaseDao<T, ID extends Serializable>
        extends HibernateBaseDao<T, ID> implements HibernateWeightedDao<T, ID> {

    public int getMaxWeight() {
        try {
            Criteria criteria = this.getSession()
                    .createCriteria(this.getPersistentClass())
                    .add(Restrictions.eq(DBNames.ACTIVE, Boolean.TRUE))
                    .setProjection(Projections.max(DBNames.WEIGHT));
            Integer maxWeight = (Integer) criteria.uniqueResult();
            if (maxWeight == null) {
                return 0;
            }
            return maxWeight;
        } catch (Exception e) {
            throw new POSDatabaseException(e);
        }
    }
}