/**
 * 
 */
package com.example.medisurveyservice.dto;

/**
 * @author joby.w
 *
 */
public class QuestionActionDTO {
	
	
	private String setName;
	
	private boolean isActive;
	
	private boolean isDefaultLayout;
	
	public QuestionActionDTO(String setName) {
		this.setName = setName;
	}

	public QuestionActionDTO(String setName, boolean isActive, boolean isDefaultLayout) {
		super();
		this.setName = setName;
		this.isActive = isActive;
		this.isDefaultLayout = isDefaultLayout;
	}

	public boolean isDefaultLayout() {
		return isDefaultLayout;
	}

	public void setDefaultLayout(boolean isDefaultLayout) {
		this.isDefaultLayout = isDefaultLayout;
	}

	public String getSetName() {
		return setName;
	}

	public void setSetName(String setName) {
		this.setName = setName;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	
	

}
