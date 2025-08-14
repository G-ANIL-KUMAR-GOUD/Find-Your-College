package com.anil.projects.findyourcollege3.Controller;

import com.anil.projects.findyourcollege3.DTO.CollegeResponseDTO;
import com.anil.projects.findyourcollege3.Entity.EamcetData;
import com.anil.projects.findyourcollege3.Service.DataService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin

@RestController
@RequestMapping("/api")
public class Controller {
    DataService service ;
    Controller(DataService DataService){
        this.service = DataService;

    }
    @GetMapping("/filter")
    public List<CollegeResponseDTO> getFilteredColleges(
            @RequestParam(required = false) Integer rank,
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) String branch,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String order
    ) {
        return service.filterAndSortColleges(rank, gender, branch, sortBy, order);
    }

    @GetMapping("/search")
    public List<String> searchColleges(@RequestParam String query) {
        return service.searchCollegesByName(query);
    }

    @GetMapping("/details/{collegeCode}")
    public List<CollegeResponseDTO> getCollegeDetails(@PathVariable String collegeCode) {
        System.out.println("in the details ");
      List< CollegeResponseDTO> demo =  service.getCollegeDetails(collegeCode);

        System.out.println(demo);
        return service.getCollegeDetails(collegeCode);
    }

}
