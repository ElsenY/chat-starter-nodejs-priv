# Unread messages feature

so the approach I use to implement this feature is to create 2 DATE column "lastOpenUser1" & "lastOpenUser2" on "conversations" table which store when the user last open the conversation.

my thinking is "unread" message is the message in a conversation that hasn't been open by the user yet, so basically the message that has higher "createdAt" than the "lastOpenUserX" is.

so then in the front-end, it will compare the messages created date and the lastOpenUserX date and calculate how many unread messages and update the UI accordingly

# Other approach

other approach that I can think of is to create BOOLEAN column "readByUser1" and "readByUser2" in the "messages" table, which will indicate if the message read by the users or not.

then in the front end will count how many messages and update the UI accordingly.

but in this approach, I feel like it's not efficient for database, since messages data count will be more than conversation data count (conversation has many messages) and will make db size grow more than storing it in "conversation" table

the plus side about this is we can manage the read/unread message independently, not dependant on if user has open the conversation or not, like what if the user only read the last message through push notif? if we want make only the last message marked as read, we can use it here. but since there's no required case like this, I use the other approach that I think is the most efficient.

these are the only 2 approach that I think still be "make sense" to be applied,

there are many other approach to this, like storing the read data per user, which will likely cause things unneccessarily more complicated since we have to store the message data into the user table.