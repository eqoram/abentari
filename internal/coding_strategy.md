# single - coding strategy

environments: dev(local), qa(hosted), pre(hosted), main(-)

## hotfix

1. Create ticket (T241) and put into excel to version
2. Adjust excel by striking deprecated feature version
3. Create branch (0.1.2-T241) from main
4. Rename versions in code to next incremental version (0.1.2-T241)
5. Create new version file internal > tickets > releases > 0.1.2-T241.txt
6. Add ticket number (T241) to the file
7. Complete work
8. Generate migration file with the incremental version (timestamp_0.1.2-T241.sql)
9. Run playwright tests
10. Commit with with the incremental version (0.1.2-T241)
11. Deploy migration file to pre instance (timestamp_0.1.2-T241.sql)
12. TESTING BEFORE MERGE
13. Merge branch (0.1.2-T241) into pre
14. TESTING AFTER MERGE
15. Merge branch (0.1.2-T241) into main
16. Make a release announcement
    1.
17. Revert other feature branch from qa branch
18. Reploy qa instance by running all migration files including hotfix (timestamp_0.1.2-T241.sql)
19. Merge branch (0.1.2-T241) into qa branch
20. Create new feature branch for reverted branch

## normal

1. Create ticket (T142) and put into excel to version
2. Create branch (0.1.1-T142) from main
3. Rename versions in code to next incremental version (0.1.1-T142)
4. Create new version file internal > tickets > releases > 0.1.1-T142.txt
5. Add ticket number (T142) to the file
6. Complete work
7. Generate migration file with the incremental version (timestamp_0.1.1-T142.sql)
8. Run playwright tests
9. Commit with with the incremental version (0.1.1-T142)
10. Deploy migration file to qa instance (timestamp_0.1.1-T142.sql)
11. TESTING BEFORE MERGE
12. Merge branch (0.1.1-T142) into qa branch
13. TESTING AFTER MERGE
14. Deploy migration file to pre instance (timestamp_0.1.1-T142.sql)
15. Merge branch (0.1.1-T142) into pre
16. Merge branch (0.1.1-T142) into main
17. Make a release announcement

# team - coding strategy

environments: dev(local), qa(hosted), pre(hosted), hotfix (hosted), main(hosted)

## hotfix

1. Create ticket (T241) and put into excel
2. Create branch (0.1.1-T241) from main
3. Rename versions in code to next incremental version (0.1.1-T241)
4. Create new version file internal > tickets > releases > 0.1.1-T241.txt
5. Add ticket number (T241) to the file
6. Complete work
7. Generate migration file with the incremental version (timestamp_0.1.1-T241.sql)
8. Run playwright tests
9. Commit with with the incremental version (0.1.1-T241)
10. Deploy migration file to hotfix instance (timestamp_0.1.1-T241.sql)
11. TESTING BEFORE MERGE
12. Merge branch (0.1.1-T241) into hotix
13. TESTING AFTER MERGE
14. Merge branch (0.1.1-T241) into main
15. Make a release announcement
    1.
16. Deploy migration file to qa instance (timestamp_0.1.1-T241.sql)
17. Merge branch (0.1.1-T241) into qa branch
18. Deploy migration file to pre instance (timestamp_0.1.1-T241.sql)
19. Merge branch (0.1.1-T241) into pre branch

## dev

1. Create ticket (T142)
2. Create branch (T142) from main
3. ~~Rename versions in code to ticket number (T142)~~
4. Create file with ticket number to internal > tickets > new > (T142.txt)
5. Complete work
6. Generate migration file with the ticket number (timestamp_T142.sql)
7. Run playwright tests
8. Commit with ticket number (T142)

## qa

1. Deploy tickets migration file to qa instance (timestamp_T142.sql)
2. TESTING BEFORE MERGE
3. Merge branch (T142) into qa branch
4. TESTING AFTER MERGE

## pre

1. Create a branch (0.2.0) from qa branch
2. Rename versions in code to next incremental version (0.2.0)
3. Create new version file internal > tickets > releases > 0.2.0.txt
4. Paste all names of files in internal > tickets > new > into it
5. Delete all files in internal > tickets > new > (except placeholder.txt)
6. Create new migration file (timestamp_0.2.0.sql)
7. Copy all new ticket migration files into it
8. Delete the ticket migration files
9. Commit with with the incremental version (0.2.0)
10. Deploy this migration file to the pre instance
11. TESTING BEFORE MERGE
12. Merge branch (0.2.0) into pre
13. TESTING AFTER MERGE

## main

1. Deploy to hotifx
2. Merge branch (0.2.0) into hotix
3. Deploy to main
4. Merge branch (0.2.0) into main
5. Make a release announcement
