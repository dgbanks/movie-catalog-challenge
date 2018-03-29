class MoviesController < ApplicationController
  def create

  end

  def show

  end

  def index

  end

  def update

  end

  def destroy

  end

  private

  def movie_params
    params.require(:movie).permit(:title, :storyline, :release_date, :genres, :imdb_link)
  end
end
