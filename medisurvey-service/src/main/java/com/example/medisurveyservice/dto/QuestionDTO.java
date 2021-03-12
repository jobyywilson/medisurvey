package com.example.medisurveyservice.dto;

import java.util.List;

import org.springframework.util.ObjectUtils;

import com.example.medisurveyservice.model.Question;
import com.example.medisurveyservice.model.SubQuestion;

/**
 * @author joby.w
 *
 */
public class QuestionDTO {

	private String id;

	private final String name;

	private final String questionType;

	private final String setName;

	private final String owner;

	private final boolean isDefaultLayout;
	
	private final List<SubQuestion> data;

	private boolean isEditAccess;

	private boolean isDeleteAllowed;

	public QuestionDTO(String id, String name, String questionType, String setName, String owner,
			boolean isDefaultLayout, List<SubQuestion> data) {
		super();
		this.id = id;
		this.name = name;
		this.questionType = questionType;
		this.setName = setName;
		this.owner = owner;
		this.isDefaultLayout = isDefaultLayout;
		this.data = data;
	}

	public static QuestionDTO clone(Question question) {
		if(ObjectUtils.isEmpty(question)) {
			return null;
		}
		
		return new QuestionDTO(question.getId(), question.getName(), question.getQuestionType(), question.getSetName(),
				question.getOwner(), question.getIsDefaultLayout(), question.getData());
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public String getQuestionType() {
		return questionType;
	}

	public String getSetName() {
		return setName;
	}

	public String getOwner() {
		return owner;
	}

	public boolean isDefaultLayout() {
		return isDefaultLayout;
	}

	public List<SubQuestion> getData() {
		return data;
	}

	public boolean isEditAccess() {
		return isEditAccess;
	}

	public void setEditAccess(boolean isEditAccess) {
		this.isEditAccess = isEditAccess;
	}

	public boolean isDeleteAllowed() {
		return isDeleteAllowed;
	}

	public void setDeleteAllowed(boolean isDeleteAllowed) {
		this.isDeleteAllowed = isDeleteAllowed;
	}

}
