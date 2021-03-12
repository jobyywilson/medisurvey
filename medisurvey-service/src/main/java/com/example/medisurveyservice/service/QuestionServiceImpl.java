package com.example.medisurveyservice.service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.example.medisurveyservice.dto.QuestionActionDTO;
import com.example.medisurveyservice.dto.QuestionDTO;
import com.example.medisurveyservice.exception.MediSurveyException;
import com.example.medisurveyservice.model.Question;
import com.example.medisurveyservice.model.User;
import com.example.medisurveyservice.repository.QuestionDaoImpl;
import com.example.medisurveyservice.repository.QuestionRepository;
import com.example.medisurveyservice.utils.CommonUtils;
import com.example.medisurveyservice.utils.Constants;

import reactor.core.publisher.Mono;

/**
 * @author joby.w
 *
 */
@Service
public class QuestionServiceImpl {

	@Autowired
	private QuestionRepository questionRepository;

	@Autowired
	private QuestionDaoImpl questionDaoImpl;

	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	public Mono<Map<String, QuestionDTO>> getActiveQuestionList(Principal principal) throws MediSurveyException {
		User user = userDetailsService.findUserByName(principal.getName());
		String defaultSetName = user.getDefaultQuestionSet();
		return getQuestionList(defaultSetName, principal);

	}

	public Mono<QuestionDTO> getQuestionById(String id) {
		return questionRepository.findById(id).map(QuestionDTO::clone);

	}

	public Mono<Map<String, Map<String, QuestionDTO>>> getQuestionList(Principal principal) {
		return questionRepository.findByOwner(principal.getName()).collectList()
				.flatMap(this::groupQuestionListBySetName);

	}

	Mono<Map<String, Map<String, QuestionDTO>>> groupQuestionListBySetName(List<Question> questionList) {
		return Mono.just(questionList.stream().map(QuestionDTO::clone).collect(Collectors
				.groupingBy(QuestionDTO::getSetName, Collectors.toMap(QuestionDTO::getId, Function.identity()))));
	}

	public Mono<QuestionDTO> save(Question question, Principal principal) {
		question.setOwner(principal.getName());
		if (question.getName().equals(Constants.DEFAULT_LAYOUT)) {
			question.setIsDefaultLayout(true);
		}
		return questionRepository.save(question).map(QuestionDTO::clone);
	}

	public Mono<QuestionDTO> update(Question question, Principal principal) throws MediSurveyException {
		String questionId = question.getId();
		if (ObjectUtils.isEmpty(questionId)) {
			throw new MediSurveyException(Constants.MSG_EMPTY_QUESTION_ID);
		} else {
			return questionRepository.findById(questionId)
					.switchIfEmpty(Mono.error(new MediSurveyException(Constants.MSG_QUESTION_ID_NOT_EXIST)))
					.flatMap(questionDB -> {
						question.setOwner(principal.getName());
						return questionRepository.save(question).map(QuestionDTO::clone);

					});
		}

	}

	public Mono<List<QuestionDTO>> clone(String oldSetName, String newSetName, Principal principal)
			throws MediSurveyException {

		CommonUtils.validateSetName(oldSetName, newSetName);

		return questionRepository.countBySetName(newSetName).flatMap(count -> {
			if (count > 0) {
				return Mono.error(new MediSurveyException(Constants.MSG_SET_ALREADY_EXISTS));
			}

			return questionRepository.findBySetName(oldSetName).switchIfEmpty(Mono.error(new MediSurveyException(Constants.MSG_EMPTY_QUESTIONS_SET)))
					.map(question -> {
						question.setSetName(newSetName);
						question.setId(null);
						question.setOwner(principal.getName());
						return question;
					}).collectList().flatMap(this::saveList);
		});
	}

	private Mono<List<QuestionDTO>> saveList(List<Question> questionList) {
		return questionRepository.saveAll(questionList).map(QuestionDTO::clone).collectList();
	}

	public Mono<Map<String, QuestionDTO>> getQuestionList(final String setName, final Principal princpal)
			throws MediSurveyException {

		CommonUtils.validateSetName(setName);
		return userDetailsService.findUserByPrincipal(princpal).map(User::getDefaultQuestionSet)
				.flatMap(defaultSetName -> {
					return questionRepository.countBySetNameAndOwner(setName, princpal.getName()).flatMap(count -> {
						boolean isDefaultLayout = setName.equals(Constants.DEFAULT_LAYOUT);

						if (count == 0 && !defaultSetName.equals(setName) && !isDefaultLayout) {
							return Mono.error(new MediSurveyException(Constants.MSG_LAYOUT_NOT_FOUND));
						} else if (count == 0 && defaultSetName.equals(setName) && !isDefaultLayout) {
							return Mono.just(new HashMap<String, QuestionDTO>());
						} else {
							return questionRepository.findBySetName(setName)
									.collect(Collectors.toMap(Question::getId, QuestionDTO::clone));
						}
					});

				});

	}

	public Mono<List<QuestionActionDTO>> findAllSetNameByOwner(Principal principal) {
		return userDetailsService.findUserByPrincipal(principal).flatMap(user -> {
			return questionDaoImpl.findDistinctSetNameByOwner(user.getUsername()).collectList()
					.map(item -> mapToActionDTO(item, user.getDefaultQuestionSet()));
		});

	}

	private List<QuestionActionDTO> mapToActionDTO(List<String> questionSetList, String currentDfltSetName) {
		List<QuestionActionDTO> questionActionList = new ArrayList<>();
		QuestionActionDTO defaultLayout = null;
		boolean foundActiveLayout = false;
		for (String questionSetName : questionSetList) {
			QuestionActionDTO questionAction = new QuestionActionDTO(questionSetName);

			if (questionSetName.equals(currentDfltSetName)) {
				questionAction.setActive(true);
				foundActiveLayout = true;
			}

			if (Constants.DEFAULT_LAYOUT.equals(questionSetName)) {
				questionAction.setDefaultLayout(true);
				defaultLayout = questionAction;
				continue;
			}
			questionActionList.add(questionAction);
		}
		if (!foundActiveLayout) {
			QuestionActionDTO activeLayout = new QuestionActionDTO(currentDfltSetName);
			activeLayout.setActive(true);
			questionActionList.add(0, activeLayout);
		}

		if (!ObjectUtils.isEmpty(defaultLayout)) {
			questionActionList.add(0, defaultLayout);
		}

		return questionActionList;

	}

	public Mono<Void> delete(String id) {

		if (ObjectUtils.isEmpty(id)) {
			return Mono.error(new MediSurveyException(Constants.MSG_COMMON_EMTY_FIELD));
		}

		return questionRepository.deleteById(id);
	}

}
