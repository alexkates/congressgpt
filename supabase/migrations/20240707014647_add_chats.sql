CREATE TABLE
  chats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID REFERENCES auth.users NOT NULL,
    NAME TEXT,
    created_at TIMESTAMP
    WITH
      TIME ZONE DEFAULT timezone ('utc', NOW ()) NOT NULL
  );

-- Enable row level security for chats
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;

-- Create a policy for individuals to create chats
CREATE POLICY "Individuals can create chats." ON chats FOR INSERT
WITH
  CHECK (auth.uid () = user_id);

-- Create a policy for individuals to view their own chats
CREATE POLICY "Individuals can view their own chats." ON chats FOR
SELECT
  USING (
    (
      SELECT
        auth.uid ()
    ) = user_id
  );

-- Create a policy for individuals to update their own chats
CREATE POLICY "Individuals can update their own chats." ON chats FOR
UPDATE USING (
  (
    SELECT
      auth.uid ()
  ) = user_id
);

-- Create a policy for individuals to delete their own chats
CREATE POLICY "Individuals can delete their own chats." ON chats FOR DELETE USING (
  (
    SELECT
      auth.uid ()
  ) = user_id
);

-- Create a table to store chat messages
CREATE TABLE
  chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    chat_id UUID REFERENCES chats (id) NOT NULL,
    CONTENT TEXT,
    ROLE TEXT,
    created_at TIMESTAMP
    WITH
      TIME ZONE DEFAULT timezone ('utc', NOW ()) NOT NULL
  );

-- Enable row level security for chat_messages
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create a policy for individuals to create chat messages
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

-- Create a policy for individuals to view their own chat messages
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

-- Create a policy for individuals to update their own chat messages
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

-- Create a policy for individuals to delete their own chat messages
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