package com.anil.projects.findyourcollege3.Service;

import com.anil.projects.findyourcollege3.DTO.CollegeResponseDTO;
import com.anil.projects.findyourcollege3.Entity.EamcetData;
import com.anil.projects.findyourcollege3.Util.BOMStripper;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class DataService {

    private List<EamcetData> cachedData = null;

    public List<EamcetData> getAllColleges() {
        if (cachedData != null) return cachedData;

        List<EamcetData> dataList = new ArrayList<>();

        try (
                Reader reader = new InputStreamReader(
                        new FileInputStream("src/main/resources/data/tseamcet.csv"),
                        StandardCharsets.UTF_8
                );
                CSVParser csvParser = new CSVParser(
                        new BOMStripper(reader),
                        CSVFormat.DEFAULT.withFirstRecordAsHeader().withTrim())
        ) {
            for (CSVRecord record : csvParser) {
                try {
                    if (record.get("class_id").isBlank() || record.get("rank").isBlank()) continue;

                    EamcetData data = new EamcetData();
                    data.setClassId(Integer.parseInt(record.get("class_id").strip()));
                    data.setRank(Integer.parseInt(record.get("rank").strip()));
                    data.setGender(record.get("gender").strip());
                    data.setCaste(record.get("caste").strip());
                    data.setRegion(record.get("region").strip());
                    data.setSeatCategory(record.get("seat_category").strip());
                    data.setBranchCode(record.get("branch_code").strip());
                    data.setBranch(record.get("branch").strip());
                    data.setCollegeCode(record.get("college_code").strip());
                    data.setCollege(record.get("college").strip());
                    data.setStudentsPerClass(Integer.parseInt(record.get("students_per_class").strip()));
                    data.setFee(Double.parseDouble(record.get("fee").strip()));

                    dataList.add(data);
                } catch (Exception e) {
                    System.out.println("Skipping invalid row: " + record.toString());
                }
            }

            cachedData = dataList;
        } catch (IOException e) {
            e.printStackTrace();
        }

        return dataList;
    }

    public List<CollegeResponseDTO> filterAndSortColleges(Integer rank, String gender, String branch, String sortBy, String order) {
        final String normalizedGender = (gender != null) ? (
                gender.trim().toUpperCase().startsWith("M") ? "M" :
                        gender.trim().toUpperCase().startsWith("F") ? "F" : null
        ) : null;

        List<EamcetData> filtered = getAllColleges().stream()
                .filter(data -> rank == null || data.getRank() >= rank)
                .filter(data -> normalizedGender == null || data.getGender().equalsIgnoreCase(normalizedGender))
                .filter(data -> branch == null || data.getBranchCode().equalsIgnoreCase(branch))
                .collect(Collectors.toList());

        Map<String, List<EamcetData>> grouped = filtered.stream()
                .collect(Collectors.groupingBy(data -> data.getCollegeCode() + "-" + data.getBranchCode()));

        List<CollegeResponseDTO> groupedResults = grouped.values().stream()
                .map(group -> {
                    EamcetData best = group.stream().min(Comparator.comparing(EamcetData::getRank)).orElse(null);
                    if (best != null) {
                        return new CollegeResponseDTO(
                                best.getCollegeCode(),
                                best.getCollege(),
                                best.getBranch(),
                                best.getBranchCode(),
                                best.getRank(),
                                best.getFee(),
                                best.getStudentsPerClass(),
                                best.getRegion()
                        );
                    }
                    return null;
                })
                .filter(Objects::nonNull)
                .sorted(getDTOComparator(sortBy, "desc".equalsIgnoreCase(order))) // ✅ Fixed comparator
                .limit(50)
                .collect(Collectors.toList());

        return groupedResults;
    }
    private Comparator<CollegeResponseDTO> getDTOComparator(String sortBy, boolean desc) {
        Map<String, Function<CollegeResponseDTO, Comparable>> sortOptions = new HashMap<>();
        sortOptions.put("rank", CollegeResponseDTO::getRank);
        sortOptions.put("fee", CollegeResponseDTO::getFee);
        sortOptions.put("college", CollegeResponseDTO::getCollege);
        sortOptions.put("students", CollegeResponseDTO::getStudentsPerClass);

        Comparator<CollegeResponseDTO> comparator = Comparator.comparing(
                sortOptions.getOrDefault(sortBy != null ? sortBy.toLowerCase() : "rank", CollegeResponseDTO::getRank)
        );

        return desc ? comparator.reversed() : comparator;
    }


    private Comparator<EamcetData> getComparator(String sortBy, boolean desc) {
        Map<String, Function<EamcetData, Comparable>> sortOptions = new HashMap<>();
        sortOptions.put("rank", EamcetData::getRank);
        sortOptions.put("fee", EamcetData::getFee);
        sortOptions.put("college", EamcetData::getCollege);
        sortOptions.put("students", EamcetData::getStudentsPerClass);

        Comparator<EamcetData> comparator = Comparator.comparing(
                sortOptions.getOrDefault(sortBy != null ? sortBy.toLowerCase() : "rank", EamcetData::getRank)
        );

        return desc ? comparator.reversed() : comparator;
    }

    public List<String> searchCollegesByName(String query) {
        return getAllColleges().stream()
                .map(EamcetData::getCollege)
                .filter(name -> name.toLowerCase().contains(query.toLowerCase()))
                .distinct()
                .limit(10)
                .collect(Collectors.toList());
    }

    public List<CollegeResponseDTO> getCollegeDetails(String collegeCode) {
        return getAllColleges().stream()
                .filter(data -> data.getCollegeCode().equalsIgnoreCase(collegeCode))
                .collect(Collectors.groupingBy(EamcetData::getBranchCode))
                .values().stream()
                .map(branchData -> {
                    Optional<EamcetData> minRank = branchData.stream().min(Comparator.comparing(EamcetData::getRank));
                    Optional<EamcetData> maxRank = branchData.stream().max(Comparator.comparing(EamcetData::getRank));

                    if (minRank.isPresent() && maxRank.isPresent()) {
                        EamcetData data = minRank.get();
                        return new CollegeResponseDTO(
                                data.getCollegeCode(),
                                data.getCollege(),
                                data.getBranch(),
                                data.getBranchCode(),
                                maxRank.get().getRank(),
                                data.getFee(),
                                data.getStudentsPerClass(),
                                data.getRegion()
                        );
                    }
                    return null;
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }
}
