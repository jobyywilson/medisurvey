package com.example.medisurveyservice.repository;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import com.example.medisurveyservice.model.Question;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * @author joby.w
 *
 */
@Repository
public interface QuestionRepository extends ReactiveCrudRepository<Question, String> {

	Flux<Question> findByOwner(String owner);

	Flux<Question> findBySetName(String setName);
	
	Mono<Long> countBySetName(String setName);
	
	Mono<Long> countBySetNameAndOwner(String setName,String owner);

}
