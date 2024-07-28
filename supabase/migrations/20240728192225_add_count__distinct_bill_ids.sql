CREATE
OR REPLACE FUNCTION count_distinct_bill_ids () RETURNS BIGINT AS $$
DECLARE
    distinct_count bigint;
BEGIN
    SELECT COUNT(DISTINCT (metadata->>'billId')) INTO distinct_count
    FROM documents;
    
    RETURN distinct_count;
END;
$$ LANGUAGE plpgsql;