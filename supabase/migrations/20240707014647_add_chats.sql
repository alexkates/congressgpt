CREATE TABLE
  chats (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID REFERENCES auth.users NOT NULL,
    name TEXT,
    created_at TIMESTAMP
    WITH
      TIME ZONE DEFAULT timezone ('utc', NOW ()) NOT NULL
  );

ALTER TABLE chats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Individuals can create chats." ON chats FOR INSERT
WITH
  CHECK (auth.uid () = user_id);

CREATE POLICY "Individuals can view their own chats." ON chats FOR
SELECT
  USING (
    (
      SELECT
        auth.uid ()
    ) = user_id
  );

CREATE POLICY "Individuals can update their own chats." ON chats FOR
UPDATE USING (
  (
    SELECT
      auth.uid ()
  ) = user_id
);

CREATE POLICY "Individuals can delete their own chats." ON chats FOR DELETE USING (
  (
    SELECT
      auth.uid ()
  ) = user_id
);

CREATE TABLE
  chat_messages (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    chat_id BIGINT REFERENCES chats (id) NOT NULL,
    message TEXT,
    created_at TIMESTAMP
    WITH
      TIME ZONE DEFAULT timezone ('utc', NOW ()) NOT NULL
  );

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Individuals can create chat messages." ON chat_messages FOR INSERT
WITH
  CHECK (
    auth.uid () = (
      SELECT
        user_id
      FROM
        chats
      WHERE
        id = chat_id
    )
  );

CREATE POLICY "Individuals can view their own chat messages." ON chat_messages FOR
SELECT
  USING (
    auth.uid () = (
      SELECT
        user_id
      FROM
        chats
      WHERE
        id = chat_id
    )
  );

CREATE POLICY "Individuals can update their own chat messages." ON chat_messages FOR
UPDATE USING (
  auth.uid () = (
    SELECT
      user_id
    FROM
      chats
    WHERE
      id = chat_id
  )
);

CREATE POLICY "Individuals can delete their own chat messages." ON chat_messages FOR DELETE USING (
  auth.uid () = (
    SELECT
      user_id
    FROM
      chats
    WHERE
      id = chat_id
  )
);