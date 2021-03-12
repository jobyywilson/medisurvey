package com.example.medisurveyservice.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author joby.w
 *
 */
@RestController
@RequestMapping("medisurvey")
public class MediSurveyController {

	@GetMapping
    public ModelAndView redirect() {
        return new ModelAndView("index.html");
    }


}
