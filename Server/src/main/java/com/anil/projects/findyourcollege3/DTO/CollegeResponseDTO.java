package com.anil.projects.findyourcollege3.DTO;

import com.anil.projects.findyourcollege3.Entity.EamcetData;

import java.util.List;

public class CollegeResponseDTO {
    private String collegeCode;
    private String college;
    private String branch;
    private String branchCode;
    private int rank;
    private double fee;
    private int studentsPerClass;
    private String region;

    public CollegeResponseDTO(String collegeCode, String college, String branch, String branchCode, int rank, double fee, int studentsPerClass, String region) {
        this.collegeCode = collegeCode;
        this.college = college;
        this.branch = branch;
        this.branchCode = branchCode;
        this.rank = rank;
        this.fee = fee;
        this.studentsPerClass = studentsPerClass;
        this.region = region;
    }

    // Getters
    public String getCollegeCode() { return collegeCode; }
    public String getCollege() { return college; }
    public String getBranch() { return branch; }
    public String getBranchCode() { return branchCode; }
    public int getRank() { return rank; }
    public double getFee() { return fee; }
    public int getStudentsPerClass() { return studentsPerClass; }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    @Override
    public String toString() {
        return "CollegeResponseDTO{" +
                "branch='" + branch + '\'' +
                ", collegeCode='" + collegeCode + '\'' +
                ", college='" + college + '\'' +
                ", branchCode='" + branchCode + '\'' +
                ", rank=" + rank +
                ", fee=" + fee +
                ", studentsPerClass=" + studentsPerClass +
                ", region='" + region + '\'' +
                '}';
    }
}
