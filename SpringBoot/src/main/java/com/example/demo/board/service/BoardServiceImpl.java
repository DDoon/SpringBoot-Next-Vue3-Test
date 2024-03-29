package com.example.demo.board.service;


import com.example.demo.board.repository.BoardRepository;
import com.example.demo.board.controller.request.BoardRequest;
import com.example.demo.board.entity.Board;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Slf4j
@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    final private BoardRepository boardRepository;

    public Board register(BoardRequest boardRequest) {
        Board board = boardRequest.toBoard();

        Board newBoard = boardRepository.save(board);

        return newBoard;
    }

    @Override
    public List<Board> list() {
        return boardRepository.findAll(Sort.by(Sort.Direction.DESC, "boardId"));
    }

    @Override
    public Board read(Long boardId) {
        Optional<Board> maybeBoard = boardRepository.findById(boardId);

        if (maybeBoard.isEmpty()) {
            log.info("Board 정보를 찾을 수 없습니다.");
            return null;
        }

        return maybeBoard.get();
    }

    @Override
    public void remove(Long boardId) {
        boardRepository.deleteById(boardId);
    }

    @Override
    public Board modify(Long boardId, BoardRequest boardRequest) {
        Optional<Board> maybeBoard = boardRepository.findById(boardId);

        if (maybeBoard.isEmpty()) {
            System.out.println("Board 정보를 찾지 못했습니다: " + boardId);
            return null;
        }

        Board board = maybeBoard.get();
        board.setTitle(boardRequest.getTitle());
        board.setContent(boardRequest.getContent());

        boardRepository.save(board);

        return board;
    }

    @Override
    public List<Board> bigMisstake(Long boardId, BoardRequest boardRequest) {
        return boardRepository.findByBoardIdAndWriter(boardId, boardRequest.getWriter());
    }

    @Override
    public Long getCount() {
        return boardRepository.countBy();
    }

    @Override
    public Long getLastEntityId() {
        Board board = boardRepository.findFirstByOrderByBoardIdDesc();
        return board.getBoardId();
    }
}
