package com.pos.dao.hibernate;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.pos.dao.ItemDao;
import com.pos.model.persist.Item;
import com.pos.utils.POSDatabaseException;

@Repository
public class HibernateItemDao extends HibernateWeightedBaseDao<Item, Long>
        implements ItemDao {

    @Override
    public List<Item> listItemsByType(long itemTypeId) {
        return this.findByCriteria(
                Restrictions.eq(DBNames.ITEMTYPEID, itemTypeId));
    }

    @Override
    public int getMaxWeight(long itemTypeId) {
        try {
            Criteria criteria = this.getSession()
                    .createCriteria(this.getPersistentClass())
                    .add(Restrictions.eq(DBNames.ITEMTYPEID, itemTypeId))
                    .add(Restrictions.eq(DBNames.ACTIVE, Boolean.TRUE))
                    .setProjection(Projections.max(DBNames.WEIGHT));
            Integer maxWeight = (Integer) criteria.uniqueResult();
            if (maxWeight == null)
                return 0;
            return maxWeight;
        } catch (Exception e) {
            throw new POSDatabaseException(e);
        }
    }
}