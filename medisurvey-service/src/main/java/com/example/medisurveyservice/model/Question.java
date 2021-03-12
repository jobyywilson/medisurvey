package com.example.medisurveyservice.model;

import java.util.List;

import org.springframework.data.annotation.Id;

/**
 * @author joby.w
 *
 */
public class Question {
	
	@Id
	private String id;
	
	private String name;
	
	private String questionType;
	
	private String setName;
	
	private String owner;
	
	private boolean isDefaultLayout;
	
	private List<SubQuestion> data;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getQuestionType() {
		return questionType;
	}
	public void setQuestionType(String questionType) {
		this.questionType = questionType;
	}
	public List<SubQuestion> getData() {
		return data;
	}
	public void setData(List<SubQuestion> data) {
		this.data = data;
	}
	public String getSetName() {
		return setName;
	}
	public void setSetName(String setName) {
		this.setName = setName;
	}
	public String getOwner() {
		return owner;
	}
	public void setOwner(String owner) {
		this.owner = owner;
	}
	public Boolean getIsDefaultLayout() {
		return isDefaultLayout;
	}
	public void setIsDefaultLayout(Boolean isDefaultLayout) {
		this.isDefaultLayout = isDefaultLayout;
	}
	

}
