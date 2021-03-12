package com.example.medisurveyservice.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.example.medisurveyservice.model.Question;
import com.example.medisurveyservice.utils.Constants;

import reactor.core.publisher.Flux;

@Repository
public class QuestionDaoImpl {
	

	@Autowired
	ReactiveMongoTemplate mongoTemplate;
	
	public Flux<String> findDistinctSetNameByOwner(String owner){
		
		Criteria ownerCriteria = Criteria.where("owner").is(owner);
		Criteria isDefaultLayout =Criteria.where("setName").is(Constants.DEFAULT_LAYOUT);
		Query query = new Query(new Criteria().orOperator(ownerCriteria,isDefaultLayout));
		return mongoTemplate.findDistinct(query, "setName", "question",Question.class,String.class);
		
		
	}

}
