package com.example.foodsearchspringserver.repository;

import com.example.foodsearchspringserver.model.Keywords;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

//Request Spring to modify records:
@Transactional
public interface KeywordRepository extends CrudRepository<Keywords, Integer> {

    //Request Spring to modify records:
    @Modifying
    @Query("DELETE FROM Keywords WHERE keyword = :keyword")
    void deleteKeyword(@Param("keyword") String keyword);

    @Modifying
    @Query("UPDATE Keywords SET keyword = :toKeyword WHERE keyword = :fromKeyword")
    void changeKeyword(@Param("fromKeyword") String fromKeyword, @Param("toKeyword") String toKeyword);
}
