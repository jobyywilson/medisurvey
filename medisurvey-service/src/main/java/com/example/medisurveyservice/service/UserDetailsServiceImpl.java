package com.example.medisurveyservice.service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.example.medisurveyservice.dto.MediSurveyResponse;
import com.example.medisurveyservice.exception.MediSurveyException;
import com.example.medisurveyservice.model.User;
import com.example.medisurveyservice.repository.UserRepository;
import com.example.medisurveyservice.utils.Constants;

import reactor.core.publisher.Mono;

/**
 * @author joby.w
 *
 */
@Component
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
				.getRequest();
		String password = request.getParameter("password");

		User user = userRepository.findByUsernameAndPassword(username, password).block();

		UserBuilder builder = null;
		if (user != null) {
			builder = org.springframework.security.core.userdetails.User.withUsername(username);
			builder.password(passwordEncoder.encode(user.getPassword()));
			builder.roles(user.getRole());
		} else {
			throw new UsernameNotFoundException("User not found.");
		}

		return builder.build();
	}

	public String getCurrentUserName() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		org.springframework.security.core.userdetails.User user =(org.springframework.security.core.userdetails.User) auth.getPrincipal();
		
		return user.getUsername();
	}
	public Mono<User> getCurrentUser() {
		return ReactiveSecurityContextHolder.getContext()
        .map(context -> context.getAuthentication().getPrincipal())
        .cast(org.springframework.security.core.userdetails.User.class).flatMap(user-> userRepository.findByUsername(user.getUsername()));
	}


	public User getCurrentUserInfo() {
		return userRepository.findByUsername(getCurrentUserName()).block();
	}
	
	public User findUserByName(String name) {
		return userRepository.findByUsername(name).block();
	}
	
	public Mono<User> findUserByPrincipal(Principal principal) {
		return userRepository.findByUsername(principal.getName());
	}

	public Mono<MediSurveyResponse> changeActiveLayout(Map<String, String> requestParams) {
		String activeLayoutName = requestParams.get("layoutName");
		if (ObjectUtils.isEmpty(activeLayoutName)) {
			return Mono.error(new MediSurveyException(Constants.MSG_USER_LAYOUT_EMPTY));
		}
		User currentUser = getCurrentUserInfo();
		currentUser.setDefaultQuestionSet(activeLayoutName);
		return userRepository.save(currentUser).flatMap(user -> {
			return Mono.just(new MediSurveyResponse(LocalDateTime.now(), Constants.MSG_USER_LAYOUT_CHANGED_200,
					Constants.MSG_USER_LAYOUT_CHANGED_200, null, HttpStatus.OK.value()));
		});

	}

}