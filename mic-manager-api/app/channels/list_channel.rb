class ListChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    
     #stream_for current_user
     stream_from "List"
  end


  def receive(data)
    puts data["message"]
    ActionCable.server.broadcast("List", data)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end


    def appear(data)
    #current_user.appear(on: data['appearing_on'])
  end

   def away
    #current_user.away
  end
end
