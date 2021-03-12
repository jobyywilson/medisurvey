package com.example.medisurveyservice.repository;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;

import com.example.medisurveyservice.model.User;

import reactor.core.publisher.Mono;

/**
 * @author joby.w
 *
 */
@Repository
public interface UserRepository extends ReactiveCrudRepository<User,String>{

	Mono<User> findByUsernameAndPassword(String username,String password);
	Mono<User> findByUsername(String username);
}
